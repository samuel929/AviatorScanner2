import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
export const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: '100%',
    },
    cardColor: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#04ff00',
        padding: 16,
        borderWidth: 2,
        borderRadius: 8,
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: "#417e5f"
    },
    text: {
        color: '#87efac',
        fontSize: 18,
        fontWeight: 'bold',
    },
    systemText: {
        color: '#04ff00',
        fontSize: 16,
        fontWeight: 'bold',
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
});

export const Platformstyles = StyleSheet.create({
    iconStyling: {
        position: 'relative', left: 10
    },
    platformCenteringColumn: {
        flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'

    },
    platformCentering: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ScrollViewConatiner: {
        flexGrow: 1, marginTop: 30
    },
    predictionTextIndicator: {
        color: '#21c45d', fontWeight: 'bold', fontSize: 12
    },
    predictionHeaderText: {
        color: '#21c45d',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        paddingTop: 50,
    },
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD_WIDTH,
        flexDirection: 'column',
        alignSelf: 'center',
        marginHorizontal: 10,
        height: '50%',
        marginVertical: 10,
    },
    cameraContainer: {
        width: CARD_WIDTH,
        height: 400, // Explicit height for camera
        position: 'relative', // Allows absolute positioning of children
        marginHorizontal: 50,
        marginVertical: 20,
        borderRadius: 12,
    },
    camera: {
        flex: 1,
        width: '100%',
        height: 250,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#04ff00',
        borderRadius: 12,
    }
    ,
    button: {
        backgroundColor: '#21c45d',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 10,
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        position: 'relative', // Position button over camera
        bottom: 25, // Distance from bottom of camera
        alignSelf: 'center', // Center horizontally
        marginTop: 50,
        justifyContent: 'center',

        alignItems: 'center',
        elevation: 10, // For Android shadow
        width: '100%',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    text: {
        color: '#04ff00',
        fontSize: 20,
        fontWeight: 'bold',
    },
    resultCard: {
        marginTop: 20,
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,
        width: CARD_WIDTH,
        alignItems: 'center',
    },
    resultText: {
        color: '#00ffaa',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    predictionCard: {
        marginTop: 12,
        backgroundColor: '#292929',
        borderRadius: 10,
        padding: 14,
        width: "100%",
        marginHorizontal: 10,
        marginVertical: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    predictionText: {
        color: '#000',
        backgroundColor: '#04ff00',
        borderWidth: 2,
        borderColor: '#04ff00',
        padding: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        marginVertical: 4,
        fontSize: 16,
        textAlign: 'center',
        width: 90,
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    debugText: {
        marginTop: 16,
        fontSize: 12,
        color: '#aaa',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },

    spinner: {
        marginTop: 12,
    },
});

export const Headerstyles = StyleSheet.create({
    headerContainer: {
        padding: 16,
        backgroundColor: '#11192b',
        borderWidth: 2,
        width: '54%',
        borderRadius: 8,
        borderColor: '#04ff00', // Shadow for Android
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    glow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#04ff00',
        opacity: 0.3,
        borderRadius: 8,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10, // Replaces gap
    },
    headerText: {
        color: '#04ff00',
        fontSize: 20,
        fontWeight: 'bold',
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
});


export const LayoutStyles = StyleSheet.create({
    iconLayoutStyle: {
        marginBottom: -4, marginRight: 6
    },
    text: {
        color: '#04ff00',
        fontSize: 20,
        fontWeight: 'bold',
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    container: {
        padding: 16,
        backgroundColor: '#11192b',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#04ff00',
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD_WIDTH,
        flexDirection: 'column',
        alignSelf: 'center',

    },
});

export const Tabstyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 12,
        gap: 10,
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: '#111',
    },
    tabText: {
        color: '#ccc',
        fontSize: 16,
    },
    activeTab: {
        backgroundColor: '#0a0', // dark green background for active
    },
    activeTabText: {
        color: '#04ff00',
        fontWeight: 'bold',
    },
    glowShadow: {
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10, // for Android
    },
    contentContainer: {
        flex: 1,
    },
    contentText: {
        fontSize: 22,
        color: '#fff',
    },
});

export const NextPredictionstyles = StyleSheet.create({
    confidenceText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#87efac',
    },
    nextScanText: {
        color: '#21c45d',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
    },
    TouchableButton: {
        backgroundColor: '#87efac',
        borderRadius: 50,
        padding: 10,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    nextDirection: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        width: "100%",
    },
    confidenceButton: {
        borderWidth: 4,
        borderColor: '#04ff00',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#283133',
        textAlign: 'center',
        width: 150,
    },
    predictionText: {
        fontWeight: 'bold',
        fontSize: 90,
        color: '#21c45d',
        justifyContent: 'center',
        marginVertical: 20,
        textAlign: 'center',
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    scanText: {
        fontSize: 16,
        color: '#888',
    },
    pushRight: {
        marginVertical: 30,
    }
});



export const ControlPanelstyles = StyleSheet.create({
    StatusStyling: {

        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },
    StatusText: {
        color: '#21c45d',
        fontWeight: 'bold',
        fontSize: 16,
    }
    ,
    additionalLayoutText: {
        width: '100%',
        backgroundColor: '#262b33',
        marginHorizontal: 0,
        marginTop: 20,
        textAlign: 'left',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    totalPredictionText: {
        color: '#04ff00',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    additionalLayoutTwo: {
        width: '50%', backgroundColor: '#262b33', marginLeft: 10
    },

    percentageText: {
        color: '#21c45d',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    AccuracyText: {
        color: '#21c45d', fontWeight: 'bold', fontSize: 16
    },
    TouchableButtonControlPanelActive: {
        backgroundColor: '#ef4444',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#04ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    TouchableButtonControlPanel: {
        backgroundColor: '#22c55e',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    containerActive: {
        flexDirection: 'row', alignItems: 'center'
    },
    LayoutTotalView: {
        width: '50%', backgroundColor: '#262b33'
    },
    ViewContainerTextDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    TotalText: {
        color: '#21c45d',
        fontWeight: 'bold',
        fontSize: 16,
    }

})