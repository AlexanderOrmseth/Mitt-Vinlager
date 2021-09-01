import axios from "axios";
import { useState, useRef, useEffect } from "react";
import TextField from "../../custom/TextField";
import { toast } from "react-hot-toast";
import Button from "../../custom/Button";
import { Download } from "react-feather";

import { ExternalLink as Link } from "react-feather";
const VinmonopoletForm = ({ vinmonopoletSubmit, setFile, withImg = true }) => {
  const cancelToken = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vinmonopoletUrl, setVinmonopoletUrl] = useState("");

  useEffect(() => {
    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel("Henting av data ble avbrutt.");
        setIsLoading(false);
        setVinmonopoletUrl("");
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    cancelToken.current = axios.CancelToken.source();
    setIsLoading(true);
    try {
      let productId = vinmonopoletUrl.trim();

      if (productId.includes("/p/")) {
        // this is an url -> get the id
        productId = vinmonopoletUrl.split("/p/").splice(-1)[0];
      }

      const res = await axios.post(
        `/vinmonopoletAPI`,
        {
          id: productId,
        },
        { cancelToken: cancelToken.current.token }
      );

      if (res.data.success) {
        // image
        if (withImg) setFile(res.data.base64);
        // submit values
        vinmonopoletSubmit(res.data.vinmonopolet);
        toast.success(res.data.msg);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        // message defined in useEffect
        toast.error(err.message);
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="vinmonopolet-form cpd form-block" onSubmit={onSubmit}>
      <div className="form-block-title">
        <a href="https://www.vinmonopolet.no" rel="noreferrer" target="_blank">
          <Link size={20} />
          <h3>Hent data fra Vinmonopolet</h3>
        </a>
      </div>
      <div className="form-block-content-wrap">
        <div className="form-block-content">
          <TextField
            value={vinmonopoletUrl}
            onChange={(e) => setVinmonopoletUrl(e.target.value)}
            name="vinmonopoletAPI"
            placeholder="Kopier lenke eller et varenummer"
          />
          <Button
            isLoading={isLoading}
            type="submit"
            icon={<Download size={18} />}
            text="Hent verdier"
          />
        </div>
      </div>
    </form>
  );
};

export default VinmonopoletForm;
