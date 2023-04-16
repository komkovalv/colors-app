const cols=document.querySelectorAll('.col')

//Изменение цветов при нажатии на "пробел"
document.addEventListener('keydown',(event) =>{
    event.preventDefault()
   if (event.code.toLowerCase()==='space'){
    setRandomColors()
   }
})

//Блокировка изменения цвета
document.addEventListener('click', (event)=>{
    const type = event.target.dataset.type

    if(type ==='lock'){
        const node=
        event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

    } else if(type==='copy'){
        copyToClickboard(event.target.textContent)
    } 
})

//Копирование цветового кода
function copyToClickboard(text){
   return navigator.clipboard.writeText(text)
}

//Получение рандомных цветов
function setRandomColors(isInitial){
    const colors=isInitial ? getColorsFromHash() : []
    cols.forEach((col, index)=>{
        const isLocked=col.querySelector('i').classList.contains('fa-lock')
        const text=col.querySelector('h2')
        const button=col.querySelector('button')
       
        

        if(isLocked){
            colors.push(text.textContent)
           return
        }
        const color= isInitial 
        ? colors[index]
          ? colors[index] 
          :chroma.random()
        : chroma.random()

        if(!isInitial){
          colors.push(color)  
        }
        

       text.textContent=color 
        col.style.background=color

        setTextColor(text,color)
        setTextColor(button,color)
    })
    updateColorsnHash(colors)
}

//Изменение цвета текста в зависимости от основного цвета
function setTextColor(text, color){
   const luminance= chroma(color).luminance()
   text.style.color=luminance >0.5 ? 'black' : 'white'

}

//Запись кода цветов в hash 
function updateColorsnHash(colors=[]){
    document.location.hash=colors.map((col)=>{
      return  col.toString().substring(1)
    }).join('-')
}

//Получение массива цветов из hash
function getColorsFromHash(){
    if(document.location.hash.length>1){
      return  document.location.hash
      .substring(1)
      .split('-')
      .map((color)=>'#'+color)
    }
    return []
}

setRandomColors(true)