const getData = async () => {
    try {
        const response = await fetch('/api/favorites')
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        return await response.json()
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

const createFavoriteItemElement = (item) => {
    const container = document.createElement('div')
    container.classList.add('fav-item')

    const img = document.createElement('img')
    img.src = item.img
    img.alt = `Device ${item.name}`
    img.classList.add('fav-item-logo')

    const name = document.createElement('p')
    name.classList.add('fav-item-name')
    name.innerHTML = item.name

    const select = document.createElement('select')
    select.classList.add('fav-item-status')
    const option = document.createElement('option')
    option.innerHTML = item.status
    option.selected = true
    select.append(option)

    const notification = document.createElement('img')
    notification.src = item.notification
    notification.alt = `${item.notification.slice(0, item.notification.length - 9)} notification`
    notification.classList.add('fav-item-notification')

    container.append(img, name, select, notification)

    return container
}

const render = async () => {
    const container = document.getElementById('items-container')
    if (!container) {
        console.error('Container element not found')
        return
    }

    const data = await getData()
    if (!data || !Array.isArray(data.favoriteItems)) {
        console.error('Invalid data format:', data)
        return
    }

    data.favoriteItems.forEach((item) => {
        const itemElement = createFavoriteItemElement(item)
        container.append(itemElement)
    })
}

window.onload = render
