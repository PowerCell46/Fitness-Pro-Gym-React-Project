export function handleFieldChange(event) {
    setProductData({...productData, [event.target.name]: event.target.value});
}