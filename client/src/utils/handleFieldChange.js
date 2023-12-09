export function handleFieldChange(event, setData, data) {
    setData({...data, [event.target.name]: event.target.value});
}