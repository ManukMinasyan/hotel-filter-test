import { Resource } from './resource'

const resources = []
let defaultResource = ''

export function createResource(options) {
  const resource = new Resource(options)

  resources.push(resource)
}

export function setDefaultResource(name) {
  defaultResource = name
}

export function getResource(name) {
  return resources.find((resource) => {
    if (name)
      return resource.name === name

    return resource.name === defaultResource
  })
}

export async function fetch(rawParams) {
  let resource
  let params

  if (typeof rawParams === 'string') {
    resource = getResource()
    params = {
      url: rawParams,
    }
  }
  else {
    resource = getResource(rawParams.resource)
    params = rawParams
  }

  if (!resource) {
    console.warn('No resource')
    return null
  }

  const url = (() => {
    if (/^(http|\/\/|\/\d)/.test(params.url))
      return params.url

    return (resource.baseUrl + params.url).replace(/\b\/\//g, '/')
  })()

  const isMultipartFormData = params.contentType === 'multipart/form-data'
  const contentType = isMultipartFormData
    ? ''
    : { 'Content-Type': params.contentType ?? 'application/json' }
  const body = isMultipartFormData
    ? params.body
    : params.body
      ? JSON.stringify(params.body)
      : null

  const response = await window.fetch(url, {
    ...(typeof params === 'object' ? params : {}),
    headers: {
      ...contentType,
      Accept: 'application/json',
      ...(await resource.getHeaders(params)),
      ...(params.headers || {}),
    },
    body,
  })

  const resContentType = response.headers.get('content-type')

  if (resContentType && resContentType.includes('application/json')) {
    const json = await response.json()

    if (response.ok) {
      if (response.status === 204) return
      return json
    }

    throw json
  }
  else {
    if (response.ok)
      return response
    else
      throw await response
  }
}

export function useApi() {
  return {
    fetch,
  }
}