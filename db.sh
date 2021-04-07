#!/bin/bash

sudo -u postgres psql << EOF

create database ee_card;
create user ee_card_user with encrypted password 'ee_card_password';
grant all privileges on database ee_card to ee_card_user;

EOF
