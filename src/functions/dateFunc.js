export const da = (dat) => {
    if (dat) {
        let arr = dat.split('по');
        let h = arr[0].trim();
        h = h.split('.');
        let res = h[2] + '-' + h[1] + '-' + h[0];
        return res;
        }
        return '';
}
export const yet = (time) => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let startDate = new Date(time);
    startDate.setDate(startDate.getDate() - 16);
    let nowDate = new Date();
     if (d > new Date(time).getTime()) {
       return 'forbidden';
     } else if (nowDate < startDate) {
       return 'early';
     } else {
      return 'go';
    }
}

