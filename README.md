# IP BLOCKLIST

This service can be invoked to check a set of IP address lists for every single attempted
phone call placed on the network, as part of a larger fraud detection system. If the IP address is
listed in any sources, then they should be returned. The service will retrieve and automatically
update from https://github.com/firehol/blocklist-ipsets without any manual intervention.

## Methodology
https://github.com/Umkus/ip-index is an offline IP lookup database of VPN CIDRs and bad actor IP ranges. Updated daily.

This list forms a curative list of blacklisted IPs. Some ISPs/Telecoms, while not being exactly hosting providers, might still provide mobile VPN services on specific IP addresses, which is not easy to detect. These are often covered in paid solutions.

Using black-listed IPs lists together with datacenter IP lists covers some of the bases, as those IPs are often used for malicious purposes and end up blacklisted eventually.


#Using this Service
This service is hosted on at https://ipset.daisbox.com

## Making requests 

- 18.213.250.117
- 89.188.24.70
- 92.53.96.22

- 92.53.96.21

```
GET: https://ipset.daisbox.com/v1/ip/match?ip=92.53.96.22

### Sample Response (Blocked IP)
{
    "success": false,
    "data": "92.53.96.22",
    "message": "FORBIDDEN",
    "status_code": 403
}
```
```
### Sample Response (Non Blocked Ip)
{
    "success": true,
    "data": "92.53.96.21",
    "message": "SUCCESS",
    "status_code": 200
}
```

