/**
 * Seeder: Demo Digital Credentials
 * 
 * This seeder creates sample digital credentials for demonstration purposes.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

// Simple UUID v4 generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Get some existing users to create credentials for
      const users = await queryInterface.sequelize.query(
        "SELECT id, full_name, username, skill_level, state, club_id, is_active FROM users WHERE user_type = 'player' LIMIT 5",
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (users.length === 0) {
        console.log('No players found. Skipping digital credentials seeder.');
        return;
      }

      const digitalCredentials = [];

      for (const user of users) {
        // Generate unique credential number and verification code
        const credentialNumber = `PF${Date.now()}${Math.floor(Math.random() * 1000)}`;
        const verificationCode = `VC${Date.now()}${Math.floor(Math.random() * 1000)}`;

        // Generate QR code data
        const qrCodeData = `${process.env.FRONTEND_URL || 'https://pickleball-federation.com'}/verify-credential/${verificationCode}`;
        
        // For demo purposes, use a placeholder QR code URL
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeData)}`;

        // Determine club status
        const clubStatus = user.club_id ? 'club_member' : 'independent';
        const clubName = user.club_id ? 'Demo Club' : null;

        // Create digital credential
        digitalCredentials.push({
          id: generateUUID(),
          user_id: user.id,
          credential_number: credentialNumber,
          verification_code: verificationCode,
          federation_name: 'Pickleball Sports Federation',
          federation_logo: null,
          player_name: user.full_name || user.username,
          nrtp_level: user.skill_level || '3.5',
          state_affiliation: user.state || 'Jalisco',
          nationality: 'Mexican',
          affiliation_status: user.is_active ? 'active' : 'inactive',
          ranking_position: Math.floor(Math.random() * 100) + 1,
          club_status: clubStatus,
          club_name: clubName,
          qr_code_url: qrCodeUrl,
          qr_code_data: qrCodeData,
          issued_date: new Date(),
          expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          last_verified: new Date(),
          verification_count: Math.floor(Math.random() * 10),
          is_verified: true,
          verification_notes: 'Demo credential for testing purposes',
          metadata: JSON.stringify({
            demo: true,
            created_by: 'seeder'
          }),
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      if (digitalCredentials.length > 0) {
        await queryInterface.bulkInsert('digital_credentials', digitalCredentials);
        console.log(`Created ${digitalCredentials.length} demo digital credentials`);
      }
    } catch (error) {
      console.error('Error in digital credentials seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('digital_credentials', {
        metadata: {
          demo: true
        }
      });
      console.log('Removed demo digital credentials');
    } catch (error) {
      console.error('Error removing demo digital credentials:', error);
      throw error;
    }
  }
}; 