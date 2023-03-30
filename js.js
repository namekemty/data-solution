const text = document.querySelectorAll("#hero-text2 path")

for (let i = 0; i < text.length; i++) {
  console.log(`Letter ${i + 1} is ${text[i].getTotalLength()}`)
}