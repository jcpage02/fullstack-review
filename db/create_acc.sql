insert into account
(
    acc_email,
    acc_hash
)

values 
(
    ${email},
    ${hash}
)

returning *