import axios from "axios";
import { serverURL } from "../main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetUserData } from "../redux/userSlice";

export async function getCurrentUser(){
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/user/getcurrentuser`, {
                    withCredentials: true
                });
                const user = response.data;
                dispatch(SetUserData(user));
                console.log(user);
            } catch (error) {
                console.error(error);
                dispatch(SetUserData(null));
            }
        }
        fetchUser();
    })
}
