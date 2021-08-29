import React from 'react';
import { DebounceSelect } from '@/components';

async function fetchUserList(username: any) {
  console.log('fetching user', username);
  return fetch(`https://randomuser.me/api/?results=${5}`)
    .then(response => response.json())
    .then(body =>
      body.results.map(user => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
        isUsed: user.login.username === 'crazybutterfly584' ? true : false,
      })),
    );
}

const SelectSearch = () => {
  return (
    <DebounceSelect
      placeholder="Select users"
      fetchOptions={fetchUserList}
      //   onChange={newValue => {
      //     setValue(newValue);
      //     console.log('value', value);
      //   }}
      style={{
        width: '100%',
      }}
    />
  );
};

export default SelectSearch;
