const getData = async () => {
    try {
        const response = await fetch('/api/analytics')
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        return await response.json()
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

const renderTitle = (device) => {
    const container = document.getElementById('card-title')
    if (!container) {
        console.error('Container element not found')
        return
    }

    const img = document.createElement('img')
    img.src = device.deviceImg
    img.alt = 'device logo'
    img.classList.add('analytics-img')
    container.append(img)

    const cardName = document.createElement('div')
    cardName.classList.add('analytics-card-name')

    const title = document.createElement('p')
    title.classList.add('analytics-card-name-title')
    title.textContent = device.name
    cardName.append(title)

    const subTitle = document.createElement('div')
    subTitle.classList.add('analytics-card-name-subtitle')

    const model = document.createElement('p')
    model.classList.add('analytics-card-name-status')
    model.textContent = device.model

    const point = document.createElement('img')
    point.src = '/img/point.svg'
    point.alt = 'point'
    point.classList.add('point')

    const serialNumber = document.createElement('p')
    serialNumber.classList.add('analytics-card-name-status')
    serialNumber.textContent = device.serialNumber

    subTitle.append(model)
    subTitle.append(point)
    subTitle.append(serialNumber)

    cardName.append(subTitle)
    container.append(cardName)

    const action = document.createElement('div')
    action.classList.add('analytics-action')

    const select = document.createElement('select')
    select.name = ''
    select.id = '1'
    select.classList.add('analytics-action-select')

    const inWorkOption = document.createElement('option')
    inWorkOption.value = 'in work'
    inWorkOption.selected = true
    inWorkOption.textContent = 'В работе'

    const freeOption = document.createElement('option')
    freeOption.value = 'free'
    freeOption.textContent = 'Свободен'

    select.append(inWorkOption)
    select.append(freeOption)

    const favoriteImg = document.createElement('img')
    favoriteImg.src = device.favoriteImg
    favoriteImg.alt = 'like'
    favoriteImg.classList.add('analytics-action-img')

    const settingsImg = document.createElement('img')
    settingsImg.src = '/img/settings.svg'
    settingsImg.alt = 'settings'
    settingsImg.classList.add('analytics-action-img')

    action.append(select)
    action.append(favoriteImg)
    action.append(settingsImg)

    container.append(action)
}

const renderDate = (date) => {
    const container = document.getElementById('date')
    if (!container) {
        console.error('Container element not found')
        return
    }

    const cont = document.createElement('div')
    cont.classList.add('date-container')

    const startInput = document.createElement('input')
    startInput.type = 'datetime-local'
    startInput.value = date.dateStart
    startInput.classList.add('date-input')

    const arrow = document.createElement('img')
    arrow.src = '/img/arrow.svg'
    arrow.alt = 'arrow'
    arrow.classList.add('date-img')

    const endInput = document.createElement('input')
    endInput.type = 'datetime-local'
    endInput.value = date.dateEnd
    endInput.classList.add('date-input')

    cont.append(startInput, arrow, endInput)
    container.append(cont)
}

const renderTable = (data) => {
    const container = document.getElementById('table')
    if (!container) {
        console.error('Container element not found')
        return
    }

    const table = document.createElement('table')
    table.classList.add('table-container')

    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')
    headerRow.classList.add('table-title')

    const headers = ['Начало', 'Тип работ', 'Работы', 'Результат', 'Пользователь']
    headers.forEach((headerText) => {
        const th = document.createElement('th')
        const p = document.createElement('p')
        p.classList.add('table-head-title')
        p.textContent = headerText
        th.append(p)
        headerRow.append(th)
    })

    thead.append(headerRow)
    table.append(thead)

    const tbody = document.createElement('tbody')

    data.table.forEach((row) => {
        const tr = document.createElement('tr')
        tr.classList.add('table-row')

        const tdDate = document.createElement('td')
        tdDate.classList.add('table-date')
        const dateP = document.createElement('p')
        dateP.textContent = row.tableDate
        tdDate.append(dateP)
        tr.append(tdDate)

        const tdWorkType = document.createElement('td')
        tdWorkType.classList.add('table-work-type')
        const statusP = document.createElement('p')
        statusP.classList.add('table-work-status')
        statusP.textContent = row.workTypeStatus

        const specP = document.createElement('p')
        specP.classList.add('table-work-spec')
        specP.textContent = row.workTypeSpec

        tdWorkType.append(statusP)
        tdWorkType.append(specP)
        tr.append(tdWorkType)

        const tdWork = document.createElement('td')
        tdWork.classList.add('table-work')
        const workP = document.createElement('p')
        workP.classList.add('table-work-id')

        row.works.forEach((work, index) => {
            if (index % 2 === 0) {
                const boldText = document.createElement('b')
                boldText.textContent = work
                workP.append(boldText)
            } else {
                workP.append(document.createTextNode(`${work}\n`), document.createElement('br'))
            }
        })
        tdWork.append(workP)
        tr.append(tdWork)

        const tdRes = document.createElement('td')
        tdRes.classList.add('table-res')
        const resP = document.createElement('p')
        resP.classList.add('table-res-text')
        resP.innerHTML = row.results
        const resImg = document.createElement('img')
        resImg.src = '/img/check.svg'
        resImg.alt = 'check'
        resImg.classList.add('table-res-img')
        tdRes.append(resP)
        tdRes.append(resImg)
        tr.append(tdRes)

        const tdUser = document.createElement('td')
        tdUser.classList.add('table-user')
        const userP = document.createElement('p')
        userP.textContent = row.user
        tdUser.append(userP)
        tr.append(tdUser)

        tbody.append(tr)
    })

    table.append(tbody)

    container.append(table)
}

const render = async () => {
    const data = await getData()
    const {deviceImg, name, model, serialNumber, workStatus, favoriteImg} = data
    renderTitle({deviceImg, name, model, serialNumber, workStatus, favoriteImg})
    const {dateStart, dateEnd} = data
    renderDate({dateStart, dateEnd})
    const {table} = data
    renderTable({table})
}

window.onload = render