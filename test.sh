#!/bin/bash
  for i in {1..20}
 do
    curl --location --request GET 'http://localhost:4000/countries/search?search=isr' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDQ1NzU3NSwiZXhwIjoxNjY0NDkzNTc1fQ.UUA7ZW2Z5jPblIqsiAiMutXnLLNwlMJoTzhA0agzjr0' \
    --data-raw ''       
 done
 --notice here I want var i to be changing with every curl.