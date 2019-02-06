export const actions = [{
    name: "getTokenByPhone",
    data: {
        phone: "13037124300",
        password: "12345678",
    },
    saveHeader: {
        token: "x-auth-token"
    }
}, {
    name: "getCurrentAccount",
    data: {
    },
    shouldBe: {
        "props.phone": "13037124300"
    }
}]
