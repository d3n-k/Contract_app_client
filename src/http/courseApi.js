import { $host, $authHost } from "./index";

export const createCourse = async (course) => {
    const {data} = await $authHost.post('api/course', course);
    return data;
}

export const fetchCourses = async (page, limit = 15) => {
    const {data} = await $host.get('api/course', {params: {
        page, limit
    }});
    return data;
}

export const fetchAllCourses = async () => {
    const {data} = await $host.get('api/allCourses');
    return data;
}

export const fetchOneCourse = async (id) => {
    const {data} = await $host.get('api/course/' + id);
    return data;
}

export const fetchCourseByNumber = async (number) => {
    const {data} = await $host.get('api/course/num/' + number);
    return data;
}

export const updateCourse = async (id, course) => {
    const {data} = await $authHost.put('api/course/' + id, course);
    return data;
}

export const deleteCourse = async (id) => {
    const {data} = await $authHost.delete('api/course/' + id);
    return data;
}