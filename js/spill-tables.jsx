import {LoadingTable} from "./tables";
import * as React from "react";
import {tweetURI} from "./twitter";
import {companiesMap} from "./companies";
import {formatNumber, renderNumericCell} from "./text";


const ShellfishSewage = () => {
  const url = "data/generated/shellfish-sewage.json"
  const columns = [
    {title: "Company", accessor: "company_name"},
    {title: "Shellfishery Area", accessor: "shellfishery"},
    {title: "Sewage Incidents", accessor: "total_count", Cell: renderNumericCell},
    {title: "Hours of Sewage", accessor: "total_hours", Cell: renderNumericCell},
  ]
  return <LoadingTable url={url} columns={columns}/>
}


const BathingSewage = () => {
  const url = "data/generated/bathing-sewage.json"
  const columns = [
    {title: "Company", accessor: "company_name"},
    {title: "Beach", accessor: "bathing"},
    {title: "Sewage Incidents", accessor: "total_count", Cell: renderNumericCell},
    {title: "Hours of Sewage", accessor: "total_hours", Cell: renderNumericCell},
  ]
  return <LoadingTable url={url} columns={columns}/>
}

const SpillsByRiver = () => {
  const url = "data/generated/spills-by-river.json"
  const columns = [
    {title: "Company", accessor: "company_name"},
    {title: "River", accessor: "river_name"},
    {title: "Sewage Incidents", accessor: "total_count", Cell: renderNumericCell},
    {title: "Hours of Sewage", accessor: "total_hours", Cell: renderNumericCell},
  ]
  return <LoadingTable url={url} columns={columns}/>
}

const SpillsByWaterType = () => {
  const url = "data/generated/spills-by-water-type.json"
  const columns = [
    {title: "Water Type", accessor: "water_type"},
    {title: "Sewage Incidents", accessor: "total_count", Cell: renderNumericCell},
    {title: "Hours of Sewage", accessor: "total_hours", Cell: renderNumericCell},
  ]
  return <LoadingTable url={url} columns={columns}/>
}

const tweetTextFromRow = (row) => {
  const constituency = row.original.constituency

  const spills = row.original.total_spills;
  const events = formatNumber(spills)
  const company = row.original.company
  const mp = row.original.twitter_handle

  const companyTwitter = companiesMap.get(company).twitter

  if ( spills > 20 ) {
    return `Horrified that ${constituency} had ${events} sewage dumps in 2020 - by ${company} ${companyTwitter} - ${mp} - are you taking action?\n\n`
  }
  else {
    return `Even though ${constituency} had few notified sewage dumps in 2020, there were more than 400,000 in England & Wales. ${mp} are you taking action?\n\n`
  }
}

const An = ( { ...props }) => {
  return <a target="_blank" rel="noopener noreferrer" {...props }>{props.children}</a>
}

const renderTwitterCell= ({row}) => {
  const uri = "https://top-of-the-poops.org"
  const text = tweetTextFromRow(row)
  const tags = ["sewage"]
  const via = "sewageuk"
  const handle = row.original.twitter_handle

  const icon_size = 24

  const content = <img width={icon_size} height={icon_size} alt="tweet icon" src="assets/icons/twitter.svg"/>
  return handle ? <An className="mp-info" href={tweetURI({uri: uri, text: text, tags: tags, via: via})}>{content}</An> : <span></span>
}

const renderInfoCell= ({row}) => {
  const icon_size = 24
  return <An className="mp-info" href={row.original.mp_uri}><img width={icon_size} height={icon_size} alt="info icon" src="assets/icons/info-circle-fill.svg"/></An>
}

const renderRankCell = ({row}) => {
  return row.index + 1
}

const SpillsByConstituency = () => {
  const spillsByConstituencyURL = "data/generated/spills-by-constituency.json"
  const columns = [
    {title: "Rank", id: "rank", Cell: renderRankCell },
    {title: "Constituency", accessor: "constituency"},
    {title: "MP Name", accessor: "mp_name"},
    {title: "Tweet", id: "twitter", Cell: renderTwitterCell },
    {title: "Party", accessor: "mp_party"},
    {title: "Info", id: "info", Cell: renderInfoCell },
    {title: "Company", accessor: "company"},
    {title: "Sewage Dumps", accessor: "total_spills", Cell: renderNumericCell},
    {title: "Hours of Sewage", accessor: "total_hours", Cell: renderNumericCell},
  ]
  return <LoadingTable className="mp-info" url={spillsByConstituencyURL} columns={columns}/>
}

export {SpillsByWaterType, SpillsByConstituency, SpillsByRiver, ShellfishSewage, BathingSewage}