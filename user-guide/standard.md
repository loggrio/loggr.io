# User Guide for loggr.io

## Build up your Raspberry Pi

* At first connect the Raspberry Pi with an ethernet cable to get access to the LAN or the internet. The network adapter of your Raspberry Pi is already pre-configured and you don't have to do anything special.

Picture Ethernet connect

* Connect the Raspberry Pi with the included power supply to a power outlet.

![ip](../images/power_lan.png)

Now the Raspberry Pi boots up automatically.
If you have already paired your Raspberry Pi with your user account the metering unit starts its work (meter and send) immediately after booting.

## Pair your Raspberry Pi

* Browse to http://loggr.stkn.org/.
* If you don't have an existing account, please create a new one ("Registrieren"). Otherwise login to your account with your credentials.
* Click on the pairing button and insert the IP from the Raspberry Pi. You can check the IP from the Raspberry Pi in your router menu. For example the Raspberry Pi uses IP 192.168.178.35 in a local area network (LAN).

![ip](../images/ip.png)

* Click on "PAIREN".

Now the Raspberry Pi is configured and paired with your user account.

## Use loggr.io

### Change graphs visibility and order

Click on "Ansicht konfigurieren". In the left list there are the shown graphs. This list should be empty on first start. On the right side you can find available sensors which can be shown as graphs in the app. Now you can drag and drop sensors from the right to the left. Sensors which are listed on the left list will be shown after clicking on "Speichern". To remove sensors from the "Angezeigte Sensoren" list just have to click on the "X" symbol which appears when hovering over a sensor.
![lists](../images/lists2.png)

### View meterings

The meterings are shown in the standard view as line graphs.
You can zoom in and out, left and right. You can also view the meterings of the last 5 minutes (5m), last hour (S), week (W), month (M).
![graphs](../images/graphs.png)

### Show average values

If you want to see the average values of meterings you can click on the average button in the right upper corner of the graph card. The graph morphs in a new graph which shows the daily average values of the current sensor.

![ip](../images/average_button.png)

For getting the standard view back click on the standard-view-button in the right upper corner.

![ip](../images/standard_view_button.png)
