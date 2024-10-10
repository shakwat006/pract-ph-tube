function settime(time){
    const hour=  parseInt(time/3600);
    let rimainingsec= time%3600
    const minite =parseInt(rimainingsec/60)
    rimainingsec =rimainingsec%60
    return `${hour} hour ago ${minite}minite ${rimainingsec}ago`
}

console.log(settime(1200));