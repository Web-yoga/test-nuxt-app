import store from '@/store'

import clip from 'text-clipper'

const splitCoords = function (coordsString) {
  if (typeof coordsString === 'string') {
    const coords = coordsString.replaceAll(/\s/g, '').split(',').map(Number)
	if(coords.length === 2 
		&& typeof coords[0] === 'number'
		 && isFinite(coords[0]) 
		 && typeof coords[1] === 'number' 
		 && isFinite(coords[1])){
		return coords
	}else{
		return null
	}
  } else {
    return coordsString
  }
}

const decodeHtml = function (html) {
  const txt = document.createElement('textarea')

  txt.innerHTML = html

  return txt.value
}

const clipText = function (html, len = 400) {
  if (html) {
    const c = html.replace(

      /<table[^>]*>[\s\S]*?<\/table>/g,

      '<div class="table-responsive">$&</div>')

    const e = document.createElement('div')

    e.innerHTML = c

    e.querySelectorAll('table').forEach(function (obj) {
      obj.setAttribute('class', 'table article-table small table-bordered')
    })

    return clip(e.innerHTML, len, {
      html: true
    })
  } else {
    return ''
  }
}

const setMetaTitle = function (title, description, keywords, clipDescription = true) {
  store.commit('clearMeta')

  if (description) {
    description = clipDescription

      ?
      clip(decodeHtml(description), 200, {

        html: true,

        stripTags: true

      }).trim()

      :
      description

    store.commit('setMeta', {

      name: 'description',

      content: description

    })
  }

  if (keywords) {
    store.commit('setMeta', {

      name: 'keywords',

      content: keywords

    })
  }

  document.title = title + ' - АгроБиоТехнология'
}

const normalizationArticle = (item) => {
	console.log('normalizationArticle')
	console.log(item)
	let announcementText = item.announcement.text
	let link = ''

	if (!announcementText) {
	  announcementText = item.content
	}
	announcementText = clip(announcementText, 160, {
	  html: true,
	  maxLines: 5,
	  breakWords: true,
	  indicator: '...',
	})

	if(item.type === 'Новость'){
		link = `/news/${item.slug}`
	}else{
		link = `/articles/${item.slug}`
	}

	return {
	  image: `/storage/uploads${item.announcement.image.path}`,
	  title: item.title,
	  text: announcementText,
	  link: link,
	  tags: item.tags,
	}
}

const normalizationShopLink = function (link) {
  if (link.includes('http')) {
    return link
  }
  return 'http://' + link;
}
const normalizationShopContacts = function (contacts) {
  return contacts
}

const normalizationPhoneLink = function(phoneNumberText){
	if(phoneNumberText)	return 'tel:+' + phoneNumberText.replace(/\D/g, '')
	return phoneNumberText
}

const normalizationEmailLink = function(emailText){
	if(emailText) return 'mailto:' + emailText
	return emailText
}

const normalizationMsgLink = function(phoneNumberText, messengerType){
	if(messengerType === 'whatsapp') return 'https://wa.me/' + phoneNumberText.replace(/\D/g, '')
	console.log('Не определяется вид мессенджера для номера: '+ phoneNumberText + ' тип: '+ messengerType)
	return phoneNumberText
}

const curDirectionToCategory = function(curDirectionId, directions){
	if(curDirectionId && directions){
		const curDirection = directions.find((item) => curDirectionId === item.id )
		if(curDirection){
			return curDirection.text
		}	
	}
	return curDirectionId
}

const getAnnouncementImage = function(articleItem) {
	if (articleItem.announcement && articleItem.announcement.image) {
	  return `https://bioprotection.ru/storage/uploads${articleItem.announcement.image.path}`
	}
	if (articleItem.type === 'Статья') {
	  return require('@/assets/images/article_item_background_stub.jpg')
	}
	return require('@/assets/images/news_item_background_stub.jpg')
  }

const capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
  splitCoords,
  decodeHtml,
  setMetaTitle,
  clipText,
  normalizationArticle,
  normalizationShopLink,
  normalizationShopContacts,
  normalizationPhoneLink,
  normalizationEmailLink,
  normalizationMsgLink,
  curDirectionToCategory,
  getAnnouncementImage,
  capitalizeFirstLetter,
}
