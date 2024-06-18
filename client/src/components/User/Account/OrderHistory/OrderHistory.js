import { addressInformationServiceFactory } from "../../../../services/addressInformationService";
import { useService } from "../../../../hooks/useService";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";

export const OrderHistory = () => {
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
};
