# IP BLOCKLIST

This service can be invoked to check a set of IP address lists for every single attempted
phone call placed on our network, as part of a larger fraud detection system. If the IP address is
listed in any sources, then they should be returned. The service will retrieve and automatically
update from https://github.com/firehol/blocklist-ipsets without any manual intervention.

