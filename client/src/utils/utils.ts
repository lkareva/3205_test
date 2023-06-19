export const toNumber = (value: string): string => value.replace(/[^0-9]/g, "")

export const numberMask = (value: string): string => {
    const mask = "__-__-__"
    const onlyNumberValue = toNumber(value)
    let formatted = ''
    if (onlyNumberValue !== '') {
        if(onlyNumberValue.length > 0){
            formatted += onlyNumberValue.slice(0,2)
        }
        if(onlyNumberValue.length >= 3){
            formatted += "-" + onlyNumberValue.slice(2,4)
        }
        if(onlyNumberValue.length >= 5){
            formatted += "-" + onlyNumberValue.slice(4,6)
        }
    }
    return formatted
}

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const isValidateEmail = (value: string): boolean =>  EMAIL_REGEXP.test(value)

export const isValidateNumber = (value: string): boolean =>  {
    const onlyNumberValue = toNumber(value)
    return onlyNumberValue.length === 0 || onlyNumberValue.length === 6
}

