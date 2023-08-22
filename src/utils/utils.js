export const getFormattedDate = argDate => {
   const date = new Date(argDate)
   if (argDate === undefined) return "-"
   let year = date.getFullYear()
   let month = date.getMonth()
   let dateNum = date.getDate()
   month = month + 1
   if (month < 10) {
      month = `0${month}`
   }
   if (dateNum < 10) {
      dateNum = `0${dateNum}`
   }
   let dateFormatted = `${year}-${month}-${dateNum}`
   return dateFormatted
}