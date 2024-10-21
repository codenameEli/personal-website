import Link from "next/link";
import { print } from "graphql/language/printer";

import styles from "./Navigation.module.css";

import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import MobileButton from "./MobileButton";

async function getData() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(where: { location: PRIMARY_MENU }) {
        nodes {
          uri
          target
          label
        }
      }
    }
  `;

  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(menuQuery));

  if (menuItems === null) {
    throw new Error("Failed to fetch data");
  }

  return menuItems;
}

export default async function Navigation() {
  const menuItems = await getData();

  return (
    <header className="site-header">
      <div className="site-header-logo">
        <a href="/" className="rubik-wet-paint-regular">td</a>
      </div>
      <nav
        className={styles.navigation}
        role="navigation"
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
      >
        {menuItems.nodes.map((item: MenuItem, index: number) => {
          if (!item.uri) return null;

          return (
            <Link
              itemProp="url"
              href={item.uri}
              key={index}
              target={item.target || "_self"}
            >
              <span itemProp="name">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
