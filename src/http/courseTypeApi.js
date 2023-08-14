import { $host, $authHost } from "./index";

export const fetchCourseTypes = async () => {
    const {data} = await $host.get('api/courseType');
    return data;
}

export const fetchOneCourseType = async (id) => {
    const {data} = await $host.get('api/courseType/' + id);
    return data;
}