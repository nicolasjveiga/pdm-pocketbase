import { Platform } from "react-native";
import axios from "axios";

const LOCAL_IP = ""; 

const baseURL =
  Platform.OS === "web"
    ? "http://127.0.0.1:8090"
    : `http://${LOCAL_IP}:8090`;

export const api = axios.create({ baseURL });
