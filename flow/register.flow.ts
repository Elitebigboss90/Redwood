export const actions = [{
    name: "sendPhoneVerificationCode",
    data: {
        phone: "13037124300",
        debug: true
    }
}, {
    name: "registerWithPhone",
    data: {
        phone: "13037124300",
        password: "12345678",
        code: "abcdefg"
    },
}, {
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
