import React, { useEffect, useRef, useState } from 'react';
import Downshift from 'downshift';
import axios from 'axios';
import { SearchIcon } from '../../utils/icons';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({
  showSymbol,
  width,
  borderRadiusTop,
  borderRadiusBottom,
  backgroundColor,
  itemHoverBackground,
  padding,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const handleFetchRequest = async (string) => {
    if (!string) return;
    if (string.length > 3) {
      await axios
        .get(`/api/companyByString?search=${string}`, {
          withCredentials: false,
        })
        .then((response) => {
          setItems(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  };

  const handleOnSelect = (item) => {
    // the item selected
    const slug = item.slug;
    console.log(item);
    router.push({
      pathname: item.industry.id == 1 ? '/company/[slug]' : item.industry.id == 3 ? '/mutual-fund/[slug]' : null,
      query: { slug: slug },
    });
  };

  const handleOnEnter = (items) => {
    if (items.length > 0) {
      const slug = items[0].slug;
      router.push({
        pathname: '/company/[slug]',
        query: { slug: slug },
      });
    }
  };

  // Delay Input value
  const debounced = useDebouncedCallback((value) => {
    handleFetchRequest(value);
  }, 1000);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <Downshift
      id="SearchBar"
      onChange={(selection) => (selection ? handleOnSelect(selection) : 'Selection Cleared')}
      //   onInputValueChange={(value) => handleFetchRequest(value)}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue, getRootProps }) => (
        <div className={`relative ${width ? width : 'w-11/12 sm:w-96 md:w-120'} `}>
          <div
            className={` 
            ${borderRadiusTop ? borderRadiusTop : 'rounded-t-3xl'}
            ${borderRadiusBottom ? borderRadiusBottom : 'rounded-b-3xl'}
            ${backgroundColor ? backgroundColor : 'bg-white dark:bg-gray-700'}
            ${padding ? padding : 'py-1'}
            relative flex items-center px-5
            `}
            {...getRootProps({}, { suppressRefError: true })}
          >
            <SearchIcon height={24} width={24} customClass={'fill-current text-gray-500'} />
            <input
              className={`
              ${backgroundColor ? backgroundColor : 'bg-white dark:bg-gray-700'}
                focus:outline-none py-2.5 px-2 w-full`}
              {...getInputProps({
                onChange: (e) => {
                  setLoading(true), debounced(e.target.value);
                },
                onKeyDown(e) {
                  if (e.key === 'Enter' && e.target.value.length > 3) {
                    handleOnEnter(items);
                  }
                },
              })}
              placeholder="Search for a Company.."
              ref={searchInputRef}
            />
          </div>
          {isOpen && inputValue ? ( // Avoid empty suggestion box on focus
            inputValue.length !== 0 ? (
              <div
                className={`
                ${borderRadiusBottom ? borderRadiusBottom : 'rounded-b-3xl'}
                ${backgroundColor ? backgroundColor : 'bg-white dark:bg-gray-700'}
                ${showSymbol ? 'pb-6' : 'pb-1'}
                  absolute top-8 w-full pt-4 z-max-1`}
                {...getMenuProps()}
              >
                {inputValue.length < 4 ? (
                  <div className="px-6 py-2 text-center">
                    <p className="text-gray-400">Keep typing...Type some more characters.</p>
                  </div>
                ) : loading ? (
                  <div className="px-6 py-2">Loading...</div>
                ) : !loading && items.length === 0 ? (
                  <div className="px-6 py-2">No matches for {inputValue}</div>
                ) : (
                  <>
                    {showSymbol ? (
                      <div className="px-6 flex justify-between">
                        <h1 className="font-semibold">Stock</h1>
                        <h1 className="font-semibold">Symbol</h1>
                      </div>
                    ) : null}
                    {items
                      .filter(
                        (item) =>
                          !inputValue ||
                          item.name.toLowerCase().includes(inputValue) ||
                          item.symbol.toLowerCase().includes(inputValue),
                      )
                      .map((item, index) => (
                        <SearchItem
                          key={item.id}
                          item={item}
                          showSymbol={showSymbol}
                          itemHoverBackground={itemHoverBackground}
                          getItemProps={getItemProps}
                          index={index}
                        />
                      ))}
                  </>
                )}
              </div>
            ) : null
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

function SearchItem({ item, showSymbol, itemHoverBackground, getItemProps, index }) {
  return (
    <div
      className={`${itemHoverBackground ? itemHoverBackground : 'hover:bg-gray-200 dark:hover:bg-gray-800'} 
      flex justify-between px-6 py-2 cursor-pointer transition ease-in-out delay-150`}
      {...getItemProps({
        key: item.id,
        index,
        item,
      })}
    >
      <p>{item.name}</p>
      {showSymbol ? <p>{item.symbol}</p> : null}
    </div>
  );
}
