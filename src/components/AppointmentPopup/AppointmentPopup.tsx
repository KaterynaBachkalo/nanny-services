import React, { FC, useRef } from "react";
import css from "./AppointmentPopup.module.css";
import useCloseModals from "../../services/closeModals";
import FormAppointment from "../FormAppointment/FormAppointment";
import { INanny } from "../../types";

interface IProps {
  onClose: (value: boolean) => void;
  nanny: INanny;
}

const AppointmentPopup: FC<IProps> = ({ onClose, nanny }) => {
  const { avatar_url, name } = nanny;

  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseModals(onClose, modalRef);

  return (
    <div ref={modalRef}>
      <div>
        <p className={css.subtitle}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
      </div>
      <div className={css.wrapAvatar}>
        <img src={avatar_url} alt="avatar" className={css.avatar} />
        <div>
          <p className={css.position}>Your nanny</p>
          <p className={css.name}>{name}</p>
        </div>
      </div>
      <FormAppointment onClose={onClose} />
    </div>
  );
};

export default AppointmentPopup;
