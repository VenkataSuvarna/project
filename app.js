const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype =form.elements.coinType.value;

    fetchPrice(ctype);

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'USD';


    res.innerHTML = `<tr style="font-weight:700; background-color:rgb(14,112,224); color:white">
    <td>
        Property
    </td> 
    <td>Value</td>
    </tr>
        
    <tr style="font-weight:700">
        <td>
            ${base}
        </td>
        <td>${price} ${target}</td>
    </tr>
    <tr style="font-weight:700">
        <td>
            Volume
        </td>
        <td>${volume}</td>
    </tr>
    <tr style="font-weight:700">
        <td>
            Change
        </td>
        <td>${change}</td>
    </tr>`

    upd = setTimeout(()=>fetchPrice(ctype),10000);
    
}