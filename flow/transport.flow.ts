///<reference path="../server/src/spec/type.d.ts"/>

export const after = ["login"]
let province: ContactService.District<"province"> = {
    code: "province_test",
    name: "test",
    level: "province",
}
let city: ContactService.District<"city"> = {
    code: "city_test",
    name: "test",
    level: "city",
}
let area: ContactService.District<"area"> = {
    code: "area_test",
    name: "test",
    level: "area",
}
let contact: ContactService.Contact = {
    name: "QAQ",
    phone: "13928329843",
    addressDistrict: {
        province: province,
        city: city,
        area: area
    },
    addressDetail: "~"
}
export const actions = [{
    name: "createReceiver",
    data: {
        contact
    }
}, {
    name: "getMyReceivers",
    data: {},
    check: (a: any[]) => {
        if (!(a.length > 0)) {
            throw new Error("Invalid Receiver get")
        }
    }
}]
