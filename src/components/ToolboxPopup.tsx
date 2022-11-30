import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import "./style.css"
import { TypeIconButtonProps, TypeWindow } from "geoview-core-types";

const w = window as TypeWindow;
const cgpv = w['cgpv'];
const { react } = cgpv;


interface ToolboxPopupProps {
  id: string;
  onClose: (close: boolean) => void;
  mainFunction: Function;
  show: boolean;
  title: string;
  setLat: React.Dispatch<React.SetStateAction<string>>;
  setLong: React.Dispatch<React.SetStateAction<string>>;
  long: string;
  lat: string;
  setVisibility: Function;
}

export const ToolboxPopup = (props: ToolboxPopupProps): JSX.Element => {
  const [show, setShow] = useState(false);

  const closeHandler = (e: any) => {
    setShow(false);
    props.onClose(false);
  };
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className={'overlay'}
    >
      <div className={'popup popup-option'}>

        <div className="margin-left-10">
          <h4 className="line">
            <img src="/assets/ToolBoxLogo.svg" className="svg-toolbox margin-right-5 margin-bot-5" />{props.title}
          </h4>
          <div className={'close'} onClick={closeHandler}>
            &times;
          </div>
        </div>
        <div className="toolbox-popup-wrapper">
          <div className="toolbox-popup-content">
            <div>
              <div className={'content margin-bot-20'}><b>Position de départ:</b></div>
              <div>
                <label className="width-80">Longitude:</label>
                <input type="number" className="margin-bot-5" id="long" value={props.long} onChange={(e) => props.setLong(e.target.value)}></input>
              </div>
              <div className="margin-bot-20">
                <label className="width-80">Latitude:</label>
                <input type="number" id="lat" value={props.lat} onChange={(e) => props.setLat(e.target.value)}></input>
              </div>
              <div className="toolbox-actions">
                <button type="button" className='button-4' onClick={() => { closeHandler(this), props.setVisibility(props.id) }}>
                  <i className="fa fa-map-marker"></i>Sélectionner un point sur la carte
                </button>
              </div>
            </div>
          </div>
          <div className="toolbox-actions">
            <button type="button" className="button-3 margin-left-10" onClick={() => { closeHandler(this), props.mainFunction(props.long, props.lat, cgpv.api.map('mapWM').currentProjection) }}>
              <i className="fa fa-check-circle-o"></i>Go
            </button>
          </div>
        </div>
        <div className="toolbox-actions">
          <button type="button" className='button-4' onClick={() => { closeHandler(this) }}>
            <i className="fa fa-bold fa-xmark"></i>Close
          </button>
        </div>
      </div>
    </div>
  );
};

ToolboxPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};