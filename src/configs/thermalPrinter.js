const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

class Thermal {
  async printerOrder(order) {
    console.log(order);
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: "tcp://xxx.xxx.xxx.xxx",
    });

    printer.alignCenter();
    printer.println("Hello world");
    // await printer.printImage("");
    printer.cut();

    try {
      printer.execute();
      console.error("Print done!");
    } catch (error) {
      console.log("Print failed:", error);
    }
  }
}

module.exports = new Thermal();
