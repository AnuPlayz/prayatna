export function Typography() {
    return (
        <div>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                How it works?
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                The application works by allowing users to first connect their wallet by Connect Wallet button
                and then they can vote for the polls and elections but before that they need to verify themselves
                by Zero Knowledge Proof Generator with the help of their governmet signed aadhaar:
            </p>
            <ol className="my-6 ml-6 [&>li]:mt-2">
                <li className="text-xl font-bold">1. Extract and process the data from the QR code:</li>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Read the QR code and extract both the signature and the signed data as bytes arrays</li>
                    <li>Verifying the signature outside of the circuit to make sure the document is signed</li>
                    <li>Fetching the official UIDAI public key, to use it as circuit input, to ensure it&apos;s RSA signed from the right authority</li>
                    <li>Hash the signal</li>
                </ul>
                <p className="text-l font-semibold">Required Data to generate the Aadhaar proof:</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li className="italic">From the QR Code:</li>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>Bytes of the signed data.</li>
                        <li>Bytes of the RSA signature.</li>
                    </ul>
                    <li className="italic">External to the QR Code:</li>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>Indian government&apos;s RSA public key.</li>
                        <li>A signal.</li>
                    </ul>
                </ul>
                <li className="text-xl font-bold">2. Generate an Anon-Aadhaar Proof:</li>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    This process involves several operations in Circom circuits to ensure
                    the privacy and integrity of your Aadhaar data while proving its authenticity
                    without revealing personal information:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><text className="font-bold">Apply the SHA-256 on the Signed Data :</text> This step involves checking the integrity and authenticity of the signed data by verifying its SHA-256 hash, as it&apos;s the hash that is signed by the RSA algorthm.</li>
                    <li><text className="font-bold">Verify the RSA Signature of the Hashed Data :</text> After verifying the data&apos;s hash, the next step is to authenticate the source of the data by verifying the RSA signature. This ensures that the data and its hash were indeed signed by the holder of the private key, in this case the UIDAI, offering a layer of security against data tampering.</li>
                    <li><text className="font-bold">Extract Identity Fields from the Signed Data :</text> Specific identity-related fields are extracted from the data (last 4 digits of the Aadhaar number, name, dob, gender, pin code, timestamp, photo)</li>
                    <li><text className="font-bold">Compute Nullifiers :</text> Nullifiers are unique identifiers derived from data fields, used to prevent double-spending or duplicate proofs without revealing the actual data. This step is crucial for maintaining privacy while ensuring the uniqueness and validity of the proof. To read more about Nullifiers.</li>
                    <li><text className="font-bold">Convert Timestamp from IST to UNIX UTC Format :</text> The timestamp associated with the data is converted into a UNIX UTC format. This standardization of time representation ensures consistency across different systems and platforms, facilitating verification processes that require time validation.</li>
                    <li><text className="font-bold">&quot;Signing&quot; the SignalHash :</text> The final step involves applying a contraints on the signalHash as part of the proof generation process. This act as a marker to the proof, that let the user to commit to a certain signal, while generating the proof. Note, that it&apos;s an optionnal parameter and it will be set as 1 by default in the SDK, it&apos;s mainly used to prevent from on-chain front-running or ERC-4337 integration.</li>
                </ul>
            </ol>
        </div>
    )
}
