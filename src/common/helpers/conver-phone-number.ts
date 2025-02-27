export const converPhoneNumber = (phoneNumber: string) => {
    const areaCodes: { [key: string]: string } = {
      '0': '+84',
      '1': '+1',
      '2': '+44',
    }
  
    const firstChar = phoneNumber.charAt(0)
    if (areaCodes[firstChar]) {
      return phoneNumber.replace(/^./, areaCodes[firstChar])
    }
    return phoneNumber
  }
  