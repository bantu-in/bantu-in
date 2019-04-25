function inRupiah(input) {
  let money = `${input}`
  let output = ''
  let count = 0
  for (let i = 0; i < money.length; i++) {
    count++
    output = money[(money.length-1)-i] + output
    if(i !== money.length-1 && count % 3 === 0) {
      output = `.${output}`
    }
  }
  output = `Rp. ${output},00-`
  return output
}

// console.log(inRupiah(51850))
// console.log(inRupiah(98846238))

module.exports = inRupiah