import { $host, $authHost } from "./index";

export const createAnnounce = async (announce) => {
    const {data} = await $host.post('api/announce', announce);
    return data;
}

export const fetchAnnounce = async () => {
    const {data} = await $host.get('api/announce');
    return data;
}


export const updateAnnounce = async (announce) => {
    const {data} = await $authHost.put('api/announce', announce);
    return data;
}

