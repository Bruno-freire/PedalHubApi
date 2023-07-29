export const validateAndTransformEmail = (email: String) => {
  if(!email){
    console.log('Não existe a propriedade email!')
    return null
  }else{
    const formatedEmail = email.toLowerCase().trim();
    return formatedEmail
  }
}