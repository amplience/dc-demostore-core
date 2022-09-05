import React, { FC } from "react";
import { useCmsEdition } from "./CmsEdition";
import { ComponentFrame } from "@components/ui";
import s from "./CmsEditionFrame.module.css";
import { Pencil, Calendar } from "@components/icons";

interface Props {
  children?: React.ReactNode;
}

const CmsEditionFrame: FC<Props> = ({ children }) => {
  const { id } = useCmsEdition() || {};

  const handleEdit = () => {
    //TODO: Generate a URL back
  };

  return (
    <ComponentFrame
      menu={
        <>
          <Calendar className={s.icon} />
          <strong className={s.label}>{id}</strong>

          <div className={s.actions}>
            <button type="button" className="btn btn-sm" onClick={handleEdit}>
              <Pencil />
            </button>
          </div>
        </>
      }
      MenuProps={{
        className: s.menu,
      }}
    >
      {children}
    </ComponentFrame>
  );
};

export default CmsEditionFrame;
