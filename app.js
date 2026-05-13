const transactions = []

const budget = 50000

function addTransaction() {

  const title = document.getElementById('title').value
  const amount = Number(document.getElementById('amount').value)
  const type = document.getElementById('type').value

  if (!title || !amount) {
    alert('Please fill all fields')
    return
  }

  transactions.push({
    title,
    amount,
    type
  })

  updateUI()

  document.getElementById('title').value = ''
  document.getElementById('amount').value = ''
}

function updateUI() {

  const list = document.getElementById('transactionList')

  list.innerHTML = ''

  let income = 0
  let expense = 0

  transactions.forEach(transaction => {

    const li = document.createElement('li')

    li.classList.add(transaction.type)

    li.innerHTML = `
      <span>${transaction.title}</span>
      <span>
        ${transaction.type === 'income' ? '+' : '-'}
        ₹${transaction.amount}
      </span>
    `

    list.appendChild(li)

    if (transaction.type === 'income') {
      income += transaction.amount
    } else {
      expense += transaction.amount
    }
  })

  const balance = income - expense

  document.getElementById('income').innerText =
    `₹${income}`

  document.getElementById('expense').innerText =
    `₹${expense}`

  document.getElementById('balance').innerText =
    `₹${balance}`

  const percent = (expense / budget) * 100

  const progressFill =
    document.getElementById('progressFill')

  progressFill.style.width = `${percent}%`

  document.getElementById('budgetPercent').innerText =
    `${percent.toFixed(1)}%`

  if (percent > 90) {
    progressFill.style.background =
      'linear-gradient(90deg,#ef4444,#dc2626)'
  }
  else if (percent > 70) {
    progressFill.style.background =
      'linear-gradient(90deg,#f59e0b,#f97316)'
  }
  else {
    progressFill.style.background =
      'linear-gradient(90deg,#22c55e,#84cc16)'
  }

  gsap.from('li', {
    opacity: 0,
    x: -30,
    duration: 0.4,
    stagger: 0.1
  })
}

gsap.from('.card', {
  opacity: 0,
  y: 40,
  duration: 1,
  stagger: 0.2
})

gsap.from('header', {
  opacity: 0,
  y: -50,
  duration: 1
})
