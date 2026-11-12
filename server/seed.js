const r=await fetch('http://localhost:4000/api/seed',{method:'POST'});console.log(await r.text());
