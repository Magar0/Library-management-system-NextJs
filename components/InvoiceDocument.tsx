import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 5,
  },
  description: {
    width: "60%",
  },
  amount: {
    width: "20%",
  },
  total: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
  },
});

// Create Document Component
const InvoiceDocument = ({
  title,
  dueDate,
  username,
}: {
  title: string;
  dueDate: string;
  username: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>INVOICE</Text>

        <Text>Invoice #: INV-2025-005</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
        <Text>Due Date: {dueDate}</Text>

        <View style={{ marginTop: 20 }}>
          <Text>From:</Text>
          <Text>Book House</Text>
          <Text>Jail Road,</Text>
          <Text>Jorhat, Assam ,12345</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>To:</Text>
          <Text>{username}</Text>
          <Text>City, State 67890</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={styles.row}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.amount}>Qty</Text>
            <Text style={styles.amount}>Price</Text>
            {/* <Text style={styles.amount}>Total</Text> */}
          </View>

          {/* Sample items */}
          <View style={styles.row}>
            <Text style={styles.description}>{title}</Text>
            <Text style={styles.amount}>1</Text>
            <Text style={styles.amount}>$100</Text>
            {/* <Text style={styles.amount}>$100</Text> */}
          </View>

          <Text style={styles.total}>Total: $100.00</Text>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
