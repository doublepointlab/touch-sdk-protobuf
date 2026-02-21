# touch-sdk-protobuf

This repository contains the Protobuf specification used for data serialization by Doublepoint input devices. Furthermore,
this README documents the Bluetooth interface through which this serialized data is transmitted.

For details on how to include Protobuf as a dependency of your project in order to parse and build Touch SDK messages, refer to [official Protobuf documentation](https://protobuf.dev/).


## Bluetooth interface

Each Doublepoint input device, including any Wear OS smartwatch running a Doublepoint app (with Touch SDK mode enabled, if applicable), implements a custom GATT interface for transmitting data and events such as sensor data and gesture detection events, playing the role of a BLE GATT server. The device advertises a service UUID of `008e74d0-7bb3-4ac5-8baf-e5e372cced76`, which can be used for filtering the scan results. Furthermore, the device advertises its four-character ID in form of manufacturer-specific data, under the manufacturer ID of 0xFFFF. That is, when the manufacturer data value behind the key of 0xFFFF is interpreted as a UTF-8 string, the first four characters of this string matches with a device-specific ID.

After the GATT server is connected to successfully, a service with a UUID of `f9d60370-5325-4c64-b874-a68c7c555bad` becomes available. This service consists of two characteristics:

- "Output" characteristic: notification and readable characteristic with UUID of `f9d60371-5325-4c64-b874-a68c7c555bad`
- "Input" characteristic:  writeable characteristic with UUID of `f9d60372-5325-4c64-b874-a68c7c555bad`

All messages passed over the output characteristic, whether by GATT read or notification, conform to the `Update` protobuf message type, defined in `watch_output.proto`, whereas the input characteristic updates conform to the `InputUpdate` message type as defined in `watch_input.proto`. The fields contained by the each message are documented in detail in the Protobuf specifications themselves.

