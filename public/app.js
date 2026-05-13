const budget = 50000

async function loadTransactions() {
  const res = await fetch('/transactions')
  const data = await res.json()

  const list = document.getElementById('list')
  list.innerHTML = ''

  let balance = 0
  let expenses = 0

  data.forEach(item => {
    const li = document.createElement('li')
    li.innerText = `${item.title} - ₹${item.amount}`
    list.appendChild(li)

    if(item.type === 'income') {
      balance += item.amount
    } else {
      balance -= item.amount
      expenses += item.amount
    }
  })

  document.getElementById('balance').innerText = `Balance: ₹${balance}`

  const percent = (expenses / budget) * 100

  const fill = document.getElementById('gaugeFill')
  fill.style.width = percent + '%'

  if(percent > 90) {
    fill.style.background = 'red'
  } else if(percent > 70) {
    fill.style.background = 'orange'
  }
}

async function addTransaction() {
  const title = document.getElementById('title').value
  const amount = Number(document.getElementById('amount').value)
  const type = document.getElementById('type').value

  await fetch('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, amount, type })
  })

  loadTransactions()
}

loadTransactions()
