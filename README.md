# Page Icon

[![Build Status](https://travis-ci.org/jiahaog/page-icon.svg?branch=master)](https://travis-ci.org/jiahaog/page-icon)
[![Code Climate](https://codeclimate.com/github/jiahaog/page-icon/badges/gpa.svg)](https://codeclimate.com/github/jiahaog/page-icon)

A library to find the highest resolution website logo for a given url.

This a Javascript implementation of http://stackoverflow.com/a/22007642/5076225.

## Installation

```bash
$ npm install --save page-icon
```

## Usage

```javascript
const pageIcon = require('page-icon');

const URL = 'https://www.facebook.com/';
pageIcon(siteUrl)
    .then(function(icon) {
        // do things with icon object
        console.log(icon);
    })
    .catch(error => {
        console.error(error);
    });
});
```

#### Icon Object

```javascript
{
    source: 'facebook.com', // domain of icon source
    type: '.png', // string extension
    data: DATA // buffer
}
```

## Tests

```bash
$ npm test
```

## License

MIT
