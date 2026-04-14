import type { Direction } from './../types/Direction';
import axios from "axios"
import { API_CONFIG } from '../config/api'

export const getDirections = async () : Promise<Direction[] | null> => 
{
    try {
        const response = await axios.get(API_CONFIG.url + '/Direction' )
        return response.data;
    } catch (error) {
        console.log(error);
        return null
    }
}
