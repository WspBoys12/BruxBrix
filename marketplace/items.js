const items = [
  {name:"Cool Sword",price:100},
  {name:"Magic Hat",price:50}
];

const itemsDiv = document.getElementById("items");
items.forEach(item=>{
  const btn = document.createElement("button");
  btn.innerText = `${item.name} - ${item.price} Bux`;
  btn.onclick = ()=>buyItem(item);
  const div = document.createElement("div");
  div.appendChild(btn);
  itemsDiv.appendChild(div);
});

function buyItem(item){
  if(!currentUser) return alert("Login first");
  const ref = db.collection("users").doc(currentUser.uid);
  ref.get().then(doc=>{
    let data=doc.data();
    if(data.bux>=item.price){
      ref.update({bux:data.bux-item.price});
      alert("Purchased "+item.name);
    } else alert("Not enough Bux!");
  });
}
