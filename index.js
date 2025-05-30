console.log('script loaded')

function paint(color) {
    const orb = document.getelementsbyId('orbID');
    orb.style = ´background-color:${color}´;
    console.log(orb)
}