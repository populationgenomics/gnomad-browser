// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
import CaretDown from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg'
import { darken, transparentize } from 'polished'
import queryString from 'query-string'
import React, { Component } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import sampleCounts from '@gnomad/dataset-metadata/sampleCounts'

import {
  DatasetId,
  labelForDataset,
  hasShortVariants,
  referenceGenome,
  shortVariantDatasetId,
} from '@gnomad/dataset-metadata/metadata'

const NavigationMenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
  border: 1px solid #6c757d;
  border-radius: 0.5em;
  margin: 0;
  list-style-type: none;
`

const TopLevelNavigationLink = styled.a`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 0.375em 0.25em;
  color: #000;
  outline: none;
  text-decoration: none;

  &:visited {
    color: #000;
  }

  &:focus {
    box-shadow: 0 0 0 0.2em ${transparentize(0.5, '#428bca')};
  }
`.withComponent(Link)

const NavigationMenuItem = styled.li`
  position: relative;
  display: inline-block;

  ${TopLevelNavigationLink} {
    background: ${(props: any) => (props.isActive ? darken(0.15, '#f8f9fa') : 'none')};
  }

  &:first-child {
    ${TopLevelNavigationLink} {
      padding-left: 0.75em;
      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
    }
  }

  &:last-child {
    ${TopLevelNavigationLink} {
      padding-right: 0.75em;
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }
  }
`

const MoreIcon = styled.span`
  img {
    position: relative;
    top: 0.11em;
    width: 0.9em;
    height: 0.9em;
  }
`

const SubNavigationMenu = styled.ul`
  position: absolute;
  z-index: 1;
  right: 0;
  display: ${(props: any) => (props.isExpanded ? 'block' : 'none')};
  width: 220px;
  padding: 0.5em 0;
  border: 1px solid #6c757d;
  margin: 0;
  background: #f8f9fa;
  list-style-type: none;

  @media (max-width: 1200px) {
    right: auto;
    left: -100px;
  }

  @media (max-width: 900px) {
    left: -150px;
  }
`

const SubNavigationLink = styled.a`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.25em 0.5em;
  color: #000;
  text-decoration: none;

  &:visited {
    color: #000;
  }

  &:active,
  &:focus,
  &:hover {
    background: ${transparentize(0.75, '#428bca')};
  }

  &:focus {
    outline: 2px solid #428bca;
  }
`.withComponent(Link)

const ItemDescription = styled.div`
  margin-top: 0.125em;
  margin-left: 5px;
  font-size: 0.68em;
  opacity: 0.6;
`

const GroupedNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 2px;
  font-weight: bold;
`
type ChildDataset = {
  id: string
  label: string
  url: Location
  description: string
  childReferenceGenome?: string
}

type NavigationMenuProps = {
  items: {
    id: string
    isActive?: boolean
    label: string
    url: string | any
    children: ChildDataset[]
  }[]
}

type State = any

class NavigationMenu extends Component<NavigationMenuProps, State> {
  container: any

  state = {
    expandedItem: null,
  }

  constructor(props: NavigationMenuProps) {
    super(props)

    this.container = React.createRef()
  }

  onBlur = () => {
    setTimeout(() => {
      if (
        this.container.current &&
        (!document.activeElement || !this.container.current.contains(document.activeElement))
      ) {
        this.setState({ expandedItem: null })
      }
    }, 0)
  }

  onClickExpandButton = (e: any) => {
    e.preventDefault()
    // @ts-expect-error TS(2339) FIXME: Property 'item' does not exist on type '{ index: n... Remove this comment to see the full error message
    const { item } = this.findItem(e.currentTarget.dataset.item)
    this.setState((state: any) => ({
      expandedItem: state.expandedItem === item.id ? null : item.id,
    }))
  }

  onKeyDownTopLevelItem = (e: any) => {
    const { key } = e

    const { items } = this.props
    const { expandedItem } = this.state
    const isExpanded = expandedItem !== null
    // @ts-expect-error TS(2339) FIXME: Property 'index' does not exist on type '{ index: ... Remove this comment to see the full error message
    const { index, item } = this.findItem(e.currentTarget.dataset.item)

    switch (key) {
      case ' ':
        e.preventDefault()
        if (item.children) {
          this.setState((state: any) => ({
            expandedItem: state.expandedItem === item.id ? null : item.id,
          }))
        } else {
          e.currentTarget.click()
        }
        break
      case 'Escape':
        this.setState({ expandedItem: null })
        break
      case 'Tab':
        if (e.shiftKey) {
          if (index > 0) {
            e.preventDefault()
            if (isExpanded && (items[index - 1] as any).children) {
              this.focusItem(
                (items[index - 1] as any).children[(items[index - 1] as any).children.length - 1].id
              )
            } else {
              this.focusItem(items[index - 1].id)
            }
          }
        } else if (index < items.length - 1) {
          e.preventDefault()
          if (isExpanded && item.children) {
            this.focusItem(item.children[0].id)
          } else {
            this.focusItem(items[index + 1].id)
          }
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (item.children) {
          this.setState({ expandedItem: item.id }, () => {
            this.focusItem(item.children[0].id)
          })
        }
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        if (index > 0) {
          this.focusItem(items[index - 1].id)
        }
        break
      case 'ArrowRight':
        if (index < items.length - 1) {
          this.focusItem(items[index + 1].id)
        }
        break
      default:
    }
  }

  onKeyDownSubMenuItem = (e: any) => {
    const { key } = e

    const { items } = this.props
    // @ts-expect-error TS(2339) FIXME: Property 'index' does not exist on type '{ index: ... Remove this comment to see the full error message
    const { index, parentItem, parentIndex } = this.findItem(e.currentTarget.dataset.item)

    switch (key) {
      case 'Escape':
        this.focusItem(parentItem.id)
        this.setState({ expandedItem: null })
        break
      case ' ':
        e.preventDefault()
        e.currentTarget.click()
        break
      case 'Tab':
        e.preventDefault()
        if (e.shiftKey) {
          if (index > 0) {
            this.focusItem(parentItem.children[index - 1].id)
          } else {
            this.focusItem(parentItem.id)
          }
        } else if (index < parentItem.children.length - 1) {
          this.focusItem(parentItem.children[index + 1].id)
        } else if (parentIndex < items.length - 1) {
          this.focusItem(items[parentIndex + 1].id)
        }
        break
      case 'ArrowLeft':
      case 'ArrowRight':
        this.focusItem(parentItem.id)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < parentItem.children.length - 1) {
          this.focusItem(parentItem.children[index + 1].id)
        } else if (parentIndex < items.length - 1) {
          this.focusItem(items[parentIndex + 1].id)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          this.focusItem(parentItem.children[index - 1].id)
        } else {
          this.focusItem(parentItem.id)
        }
        break
      default:
    }
  }

  findItem(itemId: any) {
    const { items } = this.props
    for (let i = 0; i < items.length; i += 1) {
      if (itemId === items[i].id) {
        return {
          index: i,
          item: items[i],
        }
      }
      if ((items[i] as any).children) {
        for (let j = 0; j < (items[i] as any).children.length; j += 1) {
          if (itemId === (items[i] as any).children[j].id) {
            return {
              index: j,
              item: (items[i] as any).children[j],
              parentItem: items[i],
              parentIndex: i,
            }
          }
        }
      }
    }
    return null
  }

  focusItem(itemId: any) {
    // @ts-expect-error TS(2339) FIXME: Property 'item' does not exist on type '{ index: n... Remove this comment to see the full error message
    const { item, parentItem } = this.findItem(itemId)
    const topLevelItem = parentItem === undefined ? item : parentItem
    this.setState(
      (state: any) => (state.expandedItem ? { expandedItem: topLevelItem.id } : {}),
      () => {
        const itemElement = this.container.current.querySelector(`[data-item="${itemId}"]`)
        itemElement.focus()
      }
    )
  }

  render() {
    const { items } = this.props
    const { expandedItem } = this.state
    return (
      <NavigationMenuWrapper ref={this.container}>
        {items.map((item) => {
          const isExpanded = expandedItem === item.id
          return (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            <NavigationMenuItem key={item.id} isActive={item.isActive}>
              {(item as any).url ? (
                <TopLevelNavigationLink
                  data-item={item.id}
                  to={(item as any).url}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDownTopLevelItem}
                >
                  {item.label}
                </TopLevelNavigationLink>
              ) : (
                <React.Fragment key={item.id}>
                  <TopLevelNavigationLink
                    aria-expanded={isExpanded}
                    aria-haspopup="true"
                    aria-label={item.label}
                    data-item={item.id}
                    role="button"
                    to="#"
                    onBlur={this.onBlur}
                    onClick={this.onClickExpandButton}
                    onKeyDown={this.onKeyDownTopLevelItem}
                  >
                    <MoreIcon>
                      <img src={CaretDown} alt="" aria-hidden="true" />
                    </MoreIcon>
                  </TopLevelNavigationLink>
                  {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
                  <SubNavigationMenu isExpanded={isExpanded}>
                    {Array.from(
                      new Set(item.children.map((childItem) => childItem.childReferenceGenome))
                    ).map((childReferenceGenome) => (
                      <li key={childReferenceGenome}>
                        <GroupedNav>{childReferenceGenome}</GroupedNav>
                        {item.children
                          .filter(
                            (childItem) => childItem.childReferenceGenome === childReferenceGenome
                          )
                          .map((childItem) => (
                            <li key={childItem.id}>
                              <SubNavigationLink
                                data-item={childItem.id}
                                to={childItem.url}
                                onBlur={this.onBlur}
                                onClick={() => {
                                  this.setState({ expandedItem: null })
                                  this.focusItem(item.id)
                                }}
                                onKeyDown={this.onKeyDownSubMenuItem}
                              >
                                {childItem.label}
                                {childItem.description && (
                                  <ItemDescription>{childItem.description}</ItemDescription>
                                )}
                              </SubNavigationLink>
                            </li>
                          ))}
                      </li>
                    ))}
                  </SubNavigationMenu>
                </React.Fragment>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuWrapper>
    )
  }
}

export type URLBuilder = (currentLocation: Location, targetDatasetId: DatasetId) => Location

export type DatasetOptions = {
  includeShortVariants?: boolean
  includeStructuralVariants?: boolean
  includeExac?: boolean
  includeGnomad2?: boolean
  includeGnomad2Subsets?: boolean
  includeGnomad3?: boolean
  includeGnomad3Subsets?: boolean
  includeGnomad4?: boolean
  includeGnomad4Subsets?: boolean
  includeCopyNumberVariants?: boolean
  urlBuilder?: URLBuilder
}

type DatasetSelectorProps = {
  datasetOptions: DatasetOptions
  selectedDataset: DatasetId
  history: History
}

const datasetLink: URLBuilder = (currentLocation: Location, datasetId: DatasetId): Location => ({
  ...currentLocation,
  search: queryString.stringify({ dataset: datasetId }),
})

const UnwrappedDatasetSelector = (props: DatasetSelectorProps) => {
  const { datasetOptions, selectedDataset } = props

  const {
    includeShortVariants = false,
    includeGnomad4Subsets = true,
    urlBuilder = datasetLink,
  } = datasetOptions

  const topLevelShortVariantDataset = shortVariantDatasetId(selectedDataset)

  let datasets: any = []

  if (includeShortVariants) {
    const shortVariantDatasets = [
      {
        id: 'current_short_variant',
        isActive: hasShortVariants(selectedDataset),
        label: labelForDataset(topLevelShortVariantDataset),
        url: urlBuilder(window.location, topLevelShortVariantDataset),
        childReferenceGenome: referenceGenome(topLevelShortVariantDataset),
      },
      {
        id: 'other_short_variant',
        isActive: hasShortVariants(selectedDataset),
        label: 'More datasets',
        children: [] as ChildDataset[],
      },
    ]

    if (!shortVariantDatasets[1].children) throw new Error('Dataset children undefined')

    if (includeGnomad4Subsets) {
      shortVariantDatasets[1].children.push({
        id: 'ourdna',
        label: labelForDataset('ourdna'),
        url: urlBuilder(window.location, 'ourdna'),
        description: `${sampleCounts.ourdna.total.toLocaleString()} samples`,
        childReferenceGenome: referenceGenome('ourdna'),
      })
    }
    datasets = datasets.concat(shortVariantDatasets)
  }

  return <NavigationMenu items={datasets} />
}

const DatasetSelector = withRouter<
  RouteComponentProps & DatasetSelectorProps,
  typeof UnwrappedDatasetSelector
>(UnwrappedDatasetSelector)

export default DatasetSelector
